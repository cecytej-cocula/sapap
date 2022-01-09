window.watsonAssistantChatOptions = {
  integrationID: "038c58e2-cb6b-470a-8bba-89e9168806c4", // The ID of this integration.
  region: "us-south", // The region your integration is hosted in.
  serviceInstanceID: "072ce460-9e4f-47a4-b8d4-4eb663091bdc", // The ID of your service instance.
  onLoad: function (instance) { instance.render(); }
};
setTimeout(function () {
  const t = document.createElement('script');
  t.src = "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js"
  document.head.appendChild(t);
});