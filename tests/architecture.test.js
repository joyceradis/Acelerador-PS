const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const requiredFiles = [
  'src/app/bootstrap.js',
  'src/app/router.js',
  'src/shared/services/storage.service.js',
  'src/modulos/home/home.module.js',
  'src/modulos/estacao-clinica/clinical-station.module.js',
  'src/modulos/evolucao/evolution.module.js',
  'src/modulos/internacao/internacao.module.js',
  'src/modulos/alta/alta.module.js',
  'src/modulos/receita/receita.module.js',
  'src/modulos/prescricao/prescricao.module.js',
  'src/modulos/protocolos/protocolos.module.js',
  'src/modulos/ia-clinica/ia-clinica.module.js',
  'src/modulos/configuracoes/configuracoes.module.js',
  'src/modulos/historico/historico.module.js',
  'src/modulos/perfil/perfil.module.js',
  'styles.css'
];

const htmlFiles = ['index.html', 'estação.html'];

for (const file of requiredFiles) {
  assert.ok(fs.existsSync(path.join(root, file)), `Arquivo esperado não encontrado: ${file}`);
}

for (const file of htmlFiles) {
  const content = fs.readFileSync(path.join(root, file), 'utf8');
  assert.match(content, /src\/app\/bootstrap\.js/, `${file} deve carregar o bootstrap da aplicação`);
  assert.match(content, /styles\.css/, `${file} deve carregar a folha de estilo central`);
}

console.log('Teste de arquitetura passou com sucesso.');
