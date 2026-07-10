export function registerHistoricoModule(router, appState) {
  router.register('historico', () => {
    appState.currentModule = 'historico';
    const target = document.getElementById('app');
    if (!target) return;
    target.innerHTML = '<section class="panel"><h2>Histórico</h2><p>Histórico de atendimentos e evolução do paciente.</p></section>';
  });
}
