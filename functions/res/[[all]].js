const SOURCE_URL= "https://h5login.qqchess.qq.com";


const fileProxy= async function(path) {
  let resp= await fetch(`${SOURCE_URL}${path}`);
  let headers= Object.fromEntries(resp.headers);
  if ((headers?.["content-type"]?? "").indexOf("text/html;")> -1) {
    let html= await resp.text();
    // html= html.replace(new RegExp("\/\/medium.com\/", "g"), "//mediumcom.pages.dev/");
    return new Response(html, {
      headers: headers,
    });
  }

  let blob= await resp.blob();
  return new Response(blob, {
    headers: headers,
  });
}


export function onRequest(context) {
  const host= context.request.url.split("//")[1].split("/")[0];
  const path= context.request.url.replace(`https://${host}`, "");
  return fileProxy(path);
}