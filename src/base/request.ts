export const EVENT_XHR_LOAD = 'douyinHelper:xhr:load';

export interface XHRLoadEventDetail {
  url: string;
  response: any;
}

export function interceptRequest() {
  const { send } = XMLHttpRequest.prototype;
  XMLHttpRequest.prototype.send = function() {
    const xhr = this as XMLHttpRequest;
    this.addEventListener('load', function() {
      const event = new CustomEvent<XHRLoadEventDetail>(EVENT_XHR_LOAD, {
        detail: {
          url: xhr.responseURL,
          response: getJsonResponse(xhr),
        },
      });
      document.body.dispatchEvent(event);
    });
    return send.apply(this, arguments);
  };
}

function getJsonResponse(xhr: XMLHttpRequest) {
  if (!/^(json|text)?$/.test(xhr.responseType) || !xhr.responseText) {
    return null;
  }
  try {
    return JSON.parse(xhr.responseText);
  } catch (err) {
    console.warn(err);
    return null;
  }
}

