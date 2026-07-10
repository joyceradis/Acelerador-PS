export function registerIaClinicaModule(router, appState) {
  router.register('ia-clinica', () => {
    appState.currentModule = 'ia-clinica';
    const target = document.getElementById('app');
    if (!target) return;
    target.innerHTML = '<section class="panel"><h2>IA Clínica</h2><p>Camada futura para assistentes e sugestões clínicas.</p></section>';
  });
}
