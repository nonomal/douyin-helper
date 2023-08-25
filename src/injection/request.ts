export const EVENT_REQUEST_LOAD = 'dh:request:load';

export interface RequestLoadEventDetail {
  url: string;
  response: any;
}

export function interceptRequest() {
  const { send } = XMLHttpRequest.prototype;
  XMLHttpRequest.prototype.send = function() {
    const xhr = this as XMLHttpRequest;
    this.addEventListener('load', function() {
      if (!/^(json|text)?$/.test(xhr.responseType) || !xhr.responseText) {
        return;
      }
      const event = new CustomEvent<RequestLoadEventDetail>(EVENT_REQUEST_LOAD, {
        detail: {
          url: xhr.responseURL,
          response: resolveResponse(xhr),
        },
      });
      document.dispatchEvent(event);
    });
    return send.apply(this, arguments);
  };

  const fetch = window.fetch;
  window.fetch = function() {
    return fetch.apply(this, arguments).then(async (response: Response) => {
      if (!/json|text/.test(response.headers.get('Content-Type') || '')) {
        return response;
      }
      const url = response.url;
      const body = await response.clone().json();
      const event = new CustomEvent<RequestLoadEventDetail>(EVENT_REQUEST_LOAD, {
        detail: {
          url,
          response: body,
        },
      });
      document.dispatchEvent(event);
      return response;
    });
  };
}

function resolveResponse(xhr: XMLHttpRequest) {
  try {
    return JSON.parse(xhr.responseText);
  } catch (err) {
    console.warn('[DH][resolveResponse]', err);
    return null;
  }
}
