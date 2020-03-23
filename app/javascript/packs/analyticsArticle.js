import initCharts from '../analytics/dashboard';
// This function grabs the article from the DOM and destructures two IDs from the dataset, it then passes them into initCharts
function initDashboardArticle() {
  const article = document.getElementById('article');
  const { articleId, organizationId } = article.dataset;
  initCharts({ articleId, organizationId });
}
// This waits for a change then calls initDashboardArticle when it gets one
window.InstantClick.on('change', () => {
  initDashboardArticle();
});

initDashboardArticle();
