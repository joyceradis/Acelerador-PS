import { Router } from './router.js';
import { storageService } from '../shared/services/storage.service.js';
import { registerHomeModule } from '../modulos/home/home.module.js';
import { registerClinicalStationModule } from '../modulos/estacao-clinica/clinical-station.module.js';
import { registerEvolutionModule } from '../modulos/evolucao/evolution.module.js';
import { registerInternacaoModule } from '../modulos/internacao/internacao.module.js';
import { registerAltaModule } from '../modulos/alta/alta.module.js';
import { registerReceitaModule } from '../modulos/receita/receita.module.js';
import { registerPrescricaoModule } from '../modulos/prescricao/prescricao.module.js';
import { registerProtocolosModule } from '../modulos/protocolos/protocolos.module.js';
import { registerIaClinicaModule } from '../modulos/ia-clinica/ia-clinica.module.js';
import { registerConfiguracoesModule } from '../modulos/configuracoes/configuracoes.module.js';
import { registerHistoricoModule } from '../modulos/historico/historico.module.js';
import { registerPerfilModule } from '../modulos/perfil/perfil.module.js';

export function bootstrapApp() {
  const router = new Router();
  const appState = {
    storage: storageService,
    currentModule: 'home'
  };

  registerHomeModule(router, appState);
  registerClinicalStationModule(router, appState);
  registerEvolutionModule(router, appState);
  registerInternacaoModule(router, appState);
  registerAltaModule(router, appState);
  registerReceitaModule(router, appState);
  registerPrescricaoModule(router, appState);
  registerProtocolosModule(router, appState);
  registerIaClinicaModule(router, appState);
  registerConfiguracoesModule(router, appState);
  registerHistoricoModule(router, appState);
  registerPerfilModule(router, appState);

  const params = new URLSearchParams(window.location.search);
  const routeFromQuery = params.get('module');
  router.resolve(window.location.pathname, routeFromQuery);
}

bootstrapApp();
