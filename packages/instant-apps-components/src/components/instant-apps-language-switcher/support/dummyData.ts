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

// Nearby
const uiData2 = {
  introductionContent: {
    type: "textEditor",
    label: "Edit introduction panel",
    value:
      "Search to learn more about a location and its surrounding area.</br> Use one of the following search methods: <ul><li>Click the search box and type in an address or choose <b>Use current location </b></li><li>Click within the map <div></div></li></ul></br> Results will include information about features of interest.",
    uiLocation: ["about", "appComprehension"]
  },
  introductionTitle: {
    type: "string",
    label: "Title for introduction",
    value: "",
    uiLocation: ["about", "appComprehension"]
  },
  resultsPanelPreText: {
    type: "textEditor",
    label: "Text above results",
    value: null,
    uiLocation: ["nearby", "resultsText"]
  },
  resultsPanelPostText: {
    type: "textEditor",
    label: "Text below results",
    value: null,
    uiLocation: ["nearby", "resultsText"]
  },
  noResultsMessage: {
    type: "textEditor",
    label: "Text for no results",
    value: "",
    uiLocation: ["nearby", "resultsText"]
  },
  splashButtonText: {
    type: "string",
    label: "Introduction panel button text",
    value: "Close",
    uiLocation: ["about", "appComprehension"]
  },
  title: {
    type: "string",
    label: "App title",
    value: "",
    uiLocation: ["about", "appComprehension"]
  },
  titleLink: {
    type: "string",
    label: "URL link to the title",
    value: "",
    uiLocation: ["about", "appComprehension"]
  }
};
