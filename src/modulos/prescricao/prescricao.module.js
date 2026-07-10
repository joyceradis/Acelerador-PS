export function registerPrescricaoModule(router, appState) {
  router.register('prescricao', () => {
    appState.currentModule = 'prescricao';
    const target = document.getElementById('app');
    if (!target) return;
    target.innerHTML = '<section class="panel"><h2>Prescrição</h2><p>Módulo preparado para integração com listas de medicamentos e protocolos.</p></section>';
  });
}
