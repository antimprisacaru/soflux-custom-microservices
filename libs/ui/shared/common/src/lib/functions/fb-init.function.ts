export function fbInit(appId: string) {
  (<any>window).fbAsyncInit = () => {
    FB.init({
      appId,
      xfbml: false,
      version: 'v2.9'
    });
  };

  (function (d, s, id) {
    let js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-js-sdk'));
}
