import initCharts from '../analytics/dashboard';
// This function grabs a value from the DOM and then checks if it is truthy, if so it will call initCharts and pass in an ID from the value's dataset as the value of a new object
function initDashboard() {
  const activeOrg = document.querySelector('.organization.active');
  if (activeOrg) {
    initCharts({ organizationId: activeOrg.dataset.organizationId });
  } else {
    initCharts({ organizationId: null });
  }
}
// This waits for a change then calls initDashboard when it gets one
window.InstantClick.on('change', () => {
  initDashboard();
});

initDashboard();
