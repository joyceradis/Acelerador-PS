export function registerPerfilModule(router, appState) {
  router.register('perfil', () => {
    appState.currentModule = 'perfil';
    const target = document.getElementById('app');
    if (!target) return;
    target.innerHTML = '<section class="panel"><h2>Perfil do usuário</h2><p>Dados, permissões e preferências do profissional.</p></section>';
  });
}
