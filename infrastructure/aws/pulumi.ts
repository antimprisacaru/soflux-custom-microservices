import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as k8s from "@pulumi/kubernetes";

const apps = ['client', 'collaboration', 'core', 'integration', 'messaging', 'payment', 'review', 'user']

const db = new aws.rds.Instance("my-db", {
  allocatedStorage: 20,
  engine: "postgres",
  engineVersion: "11.9",
  instanceClass: "db.t3.medium",
  password: "foo12345", // Please change this
  skipFinalSnapshot: true,
  username: "foo" // Please change this
});

const redis = new aws.elasticache.Cluster("my-redis", {
  clusterId: "my-redis",
  engine: "redis",
  nodeType: "cache.m4.large",
  numCacheNodes: 1,
});

const appsyncApi = new aws.appsync.GraphQLApi("my-api", {
  authenticationType: "AMAZON_COGNITO_USER_POOLS",
  userPoolConfig: {
    awsRegion: aws.config.region,
    userPoolId: "mypool", // Please change this to your user pool's ID
    defaultAction: "ALLOW",
    appIdClientRegex: "^.*$", // Allow all client
  }
});

apps.forEach(app => {
  new k8s.apps.v1.Deployment(app, {
    spec: {
      selector: {matchLabels: app},
      replicas: 1,
      template: {
        metadata: {labels: app},
        spec: {containers: [{name: app, image: `my-repo/${app}`}]}
      }
    },
  });

  new k8s.core.v1.Service(app, {
    metadata: {labels: app},
    spec: {
      type: 'LoadBalancer',
      ports: [{port: 80, targetPort: 80}],
      selector: app
    }
  });
});

// Exports
export const dbHostName = db.address;
export const redisUrl = redis.cacheNodes.apply(nodes => nodes[0].address);
export const apiEndPoint = appsyncApi.uris.apply(uris => uris["GRAPHQL"]);
