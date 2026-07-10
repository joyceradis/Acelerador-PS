export function registerReceitaModule(router, appState) {
  router.register('receita', () => {
    appState.currentModule = 'receita';
    const target = document.getElementById('app');
    if (!target) return;
    target.innerHTML = '<section class="panel"><h2>Receita</h2><p>Módulo de receitas com validação e histórico.</p></section>';
  });
}
