import { addListener, MSG_PREPARE_TO_DOWNLOAD } from '../../base/message';

const MAX_RULE_COUNT = 1000;
let currentId = 0;

export function init() {
  addListener(MSG_PREPARE_TO_DOWNLOAD, async ({ filter, filename }) => {
    currentId = currentId % MAX_RULE_COUNT + 1;
    await chrome.declarativeNetRequest.updateSessionRules({
      removeRuleIds: [currentId],
      addRules: [{
        id: currentId,
        priority: 1,
        condition: {
          urlFilter: filter,
          resourceTypes: [chrome.declarativeNetRequest.ResourceType.MAIN_FRAME]
        },
        action: {
          type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
          responseHeaders: [
            {
              header: 'Content-Disposition',
              operation: chrome.declarativeNetRequest.HeaderOperation.APPEND,
              value: `attachment; filename="${filename}"`,
            },
          ],
        },
      }],
    });
  });
}
