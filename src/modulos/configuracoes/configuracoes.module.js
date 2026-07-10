export function registerConfiguracoesModule(router, appState) {
  router.register('configuracoes', () => {
    appState.currentModule = 'configuracoes';
    const target = document.getElementById('app');
    if (!target) return;
    target.innerHTML = '<section class="panel"><h2>Configurações</h2><p>Definições e preferências do sistema.</p></section>';
  });
}
