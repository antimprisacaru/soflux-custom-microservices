async function main() {
  const [{ bootstrap }] = await Promise.all([import('./config/bootstrap')]);
  await bootstrap();
}

main().catch(console.log);
