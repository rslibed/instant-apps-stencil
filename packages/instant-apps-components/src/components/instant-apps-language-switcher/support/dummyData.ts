// Attachment Viewer
const uiData = {
  title: {
    type: "string",
    label: "App title",
    value: "AV - search config - Test",
    uiLocation: ["about"]
  },
  onboardingImage: {
    type: "string",
    label: "Image URL to display with introduction panel",
    value: "",
    uiLocation: ["about"]
  },
  onboardingButtonText: {
    type: "string",
    label: "Introduction panel button text",
    value: "Okay",
    uiLocation: ["about"]
  },
  customOnboardingHTML: {
    type: "textEditor",
    label: "Custom onboarding HTML",
    value:
      "<h2><span style='color:#0079c1'>Welcome!</span></h2><p>View a location&rsquo;s attachments:</p><p>In addition to browsing through location details and attachments, use the following methods to explore the map:</p><ul><li>Select a feature on the map</li><li>If a search box is available, search for a specific feature</li></ul>",
    uiLocation: ["about"]
  }
};
