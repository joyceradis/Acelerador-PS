export function registerClinicalStationModule(router, appState) {
  router.register('estacao', () => {
    appState.currentModule = 'clinical-station';
    const target = document.getElementById('app');
    if (!target) return;

    const params = new URLSearchParams(window.location.search);
    const mode = params.get('mode') || 'entrada';
    const qp = params.get('qp');

    target.innerHTML = `
      <header class="topbar">
        <div class="wrap">
          <div>
            <h1>HMS | Estação Clínica</h1>
            <p id="currentModeLabel">${mode === 'entrada' ? 'Entrada PS' : mode}</p>
          </div>
          <div class="top-actions">
            <a class="btn ghost" href="index.html">Home</a>
            <button class="btn primary" id="copyTop">Copiar prontuário</button>
          </div>
        </div>
      </header>

      <main class="wrap shell">
        <aside class="side">
          <div class="panel dark">
            <div class="panel-title">Queixa principal</div>
            <div class="qplist">
              <button class="nav" data-qp="DOR TORÁCICA">Dor torácica</button>
              <button class="nav" data-qp="DISPNEIA">Dispneia</button>
              <button class="nav" data-qp="DOR ABDOMINAL">Dor abdominal</button>
              <button class="nav" data-qp="CEFALEIA">Cefaleia</button>
              <button class="nav" data-qp="FEBRE / SEPSE">Febre / sepse</button>
              <button class="nav" data-qp="SÍNCOPE">Síncope</button>
            </div>
          </div>

          <div class="panel">
            <div class="panel-title">Ações</div>
            <div class="navlist">
              <button class="nav" data-mode="entrada">Entrada</button>
              <button class="nav" data-mode="reavaliacao">Reavaliação</button>
              <button class="nav" data-mode="alta">Alta</button>
              <button class="nav" data-mode="internacao">Internação</button>
              <button class="nav" data-mode="parecer">Parecer</button>
              <button class="nav" data-mode="exame">Exame alto custo</button>
              <button class="nav" data-mode="passagem">Passagem</button>
            </div>
          </div>
        </aside>

        <section class="center">
          <div class="panel">
            <div class="panel-title">Coleta clínica</div>
            <div class="body">
              <div class="grid3">
                <div>
                  <label>Paciente</label>
                  <input id="paciente">
                </div>
                <div>
                  <label>Destino provável</label>
                  <select id="destino">
                    <option>EM OBSERVAÇÃO</option>
                    <option>ALTA APÓS REAVALIAÇÃO</option>
                    <option>INTERNAÇÃO EM ENFERMARIA</option>
                    <option>UTI</option>
                    <option>TRANSFERÊNCIA</option>
                    <option>PARECER ESPECIALISTA</option>
                  </select>
                </div>
                <div>
                  <label>Tempo de sintomas</label>
                  <input id="tempo">
                </div>
              </div>

              <label>HDA</label>
              <textarea id="hda" class="big"></textarea>

              <div id="scenarioFields" class="grid2"></div>

              <div class="grid4">
                <div><label>PA</label><input id="pa"></div>
                <div><label>FC</label><input id="fc"></div>
                <div><label>FR</label><input id="fr"></div>
                <div><label>SATO2</label><input id="sat"></div>
              </div>

              <div class="grid4">
                <div><label>TAX</label><input id="tax"></div>
                <div><label>HGT</label><input id="hgt"></div>
                <div><label>Dor</label><input id="dor"></div>
                <div><label>Score</label><input id="score"></div>
              </div>

              <div class="grid2">
                <div>
                  <label>Exame físico</label>
                  <textarea id="exame" class="big"></textarea>
                </div>
                <div>
                  <label>Exames complementares</label>
                  <textarea id="exames" class="big"></textarea>
                </div>
              </div>
            </div>
          </div>

          <div class="panel">
            <div class="panel-title">Raciocínio e auditoria</div>
            <div class="body">
              <div class="grid2">
                <div>
                  <label>Hipóteses diagnósticas</label>
                  <textarea id="hd" class="big"></textarea>
                </div>
                <div>
                  <label>Conduta</label>
                  <textarea id="conduta" class="big"></textarea>
                </div>
              </div>

              <label>Red flags</label>
              <div id="redFlags" class="checks"></div>

              <label>Justificativa</label>
              <textarea id="just" class="big"></textarea>
            </div>
          </div>
        </section>

        <aside class="preview">
          <div class="panel">
            <div class="panel-title">Texto final</div>
            <div class="body preview-body">
              <textarea id="out" class="output"></textarea>
              <div class="bar">
                <button class="btn primary" id="copy">Copiar</button>
                <button class="btn" id="regen">Regerar</button>
              </div>
            </div>
          </div>
        </aside>
      </main>
    `;

    const state = {
      mode,
      qp,
      patient: '',
      destination: '',
      symptoms: '',
      hda: '',
      selectedScenario: qp || 'DOR TORÁCICA'
    };

    const scenarioForMode = {
      entrada: {
        'DOR TORÁCICA': ['Dor torácica', 'Pain score', 'ECG'],
        DISPNEIA: ['Dispneia', 'O2', 'SatO2'],
        'DOR ABDOMINAL': ['Dor abdominal', 'Anamnese', 'Exames'],
        CEFALEIA: ['Cefaleia', 'AVC', 'Avaliação neurológica'],
        'FEBRE / SEPSE': ['Febre', 'Sepse', 'Hemocultura'],
        SÍNCOPE: ['Síncope', 'Desmaio', 'Eletrocardiograma']
      },
      reavaliacao: {
        'DOR TORÁCICA': ['Reavaliação', 'Sinais vitais'],
        DISPNEIA: ['Reavaliação', 'Oxigênio'],
        'DOR ABDOMINAL': ['Reavaliação', 'Exame'],
        CEFALEIA: ['Reavaliação', 'Neuro'],
        'FEBRE / SEPSE': ['Reavaliação', 'Sepse'],
        SÍNCOPE: ['Reavaliação', 'Eletrocardiograma']
      }
    };

    const fields = document.getElementById('scenarioFields');
    const redFlags = document.getElementById('redFlags');
    const output = document.getElementById('out');
    const patientInput = document.getElementById('paciente');
    const destinationInput = document.getElementById('destino');
    const symptomsInput = document.getElementById('tempo');
    const hdaInput = document.getElementById('hda');
    const hdInput = document.getElementById('hd');
    const condutaInput = document.getElementById('conduta');
    const justInput = document.getElementById('just');
    const exameInput = document.getElementById('exame');
    const examesInput = document.getElementById('exames');
    const paInput = document.getElementById('pa');
    const fcInput = document.getElementById('fc');
    const frInput = document.getElementById('fr');
    const satInput = document.getElementById('sat');
    const taxInput = document.getElementById('tax');
    const hgtInput = document.getElementById('hgt');
    const dorInput = document.getElementById('dor');
    const scoreInput = document.getElementById('score');

    if (fields) {
      fields.innerHTML = scenarioForMode[mode]?.[state.selectedScenario]?.map((item) => `<div><label>${item}</label><input data-scenario="${item}"></div>`).join('') || '';
    }

    if (redFlags) {
      redFlags.innerHTML = [
        'Dor torácica com instabilidade',
        'Dispneia grave',
        'Sinais de sepse',
        'Alteração neurológica',
        'Choque',
        'Hipóxia refratária'
      ].map((item) => `<label><input type="checkbox"> ${item}</label>`).join('');
    }

    const renderOutput = () => {
      const scenarioValues = Array.from(fields?.querySelectorAll('input') || []).map((input) => `${input.dataset.scenario}: ${input.value}`).join('\n');
      output.value = [
        `Paciente: ${patientInput?.value || ''}`,
        `Destino provável: ${destinationInput?.value || ''}`,
        `Tempo de sintomas: ${symptomsInput?.value || ''}`,
        '',
        'HDA',
        hdaInput?.value || '',
        '',
        'Detalhes do cenário',
        scenarioValues,
        '',
        'Hipóteses diagnósticas',
        hdInput?.value || '',
        '',
        'Conduta',
        condutaInput?.value || '',
        '',
        'Justificativa',
        justInput?.value || ''
      ].filter(Boolean).join('\n');
    };

    const bind = () => {
      [patientInput, destinationInput, symptomsInput, hdaInput, hdInput, condutaInput, justInput, exameInput, examesInput, paInput, fcInput, frInput, satInput, taxInput, hgtInput, dorInput, scoreInput].forEach((input) => {
        input?.addEventListener('input', renderOutput);
      });
      fields?.querySelectorAll('input').forEach((input) => input.addEventListener('input', renderOutput));
      document.querySelectorAll('[data-mode]').forEach((button) => {
        button.addEventListener('click', () => { window.location.href = `estação.html?mode=${button.dataset.mode}`; });
      });
      document.querySelectorAll('[data-qp]').forEach((button) => {
        button.addEventListener('click', () => { window.location.href = `estação.html?mode=${mode}&qp=${encodeURIComponent(button.dataset.qp)}`; });
      });
      document.getElementById('copy')?.addEventListener('click', () => navigator.clipboard.writeText(output.value));
      document.getElementById('copyTop')?.addEventListener('click', () => navigator.clipboard.writeText(output.value));
      document.getElementById('regen')?.addEventListener('click', renderOutput);
    };

    bind();
    renderOutput();

    try {
      const draft = appState.storage.getItem('hms_station_v1', null);
      if (draft && typeof draft === 'object') {
        Object.entries(draft).forEach(([key, value]) => {
          const input = document.getElementById(key);
          if (input) input.value = value;
        });
        renderOutput();
      }
    } catch (error) {
      console.warn('Não foi possível restaurar o rascunho', error);
    }

    const persistDraft = () => {
      const payload = {};
      ['paciente', 'destino', 'tempo', 'hda', 'hd', 'conduta', 'just', 'exame', 'exames', 'pa', 'fc', 'fr', 'sat', 'tax', 'hgt', 'dor', 'score'].forEach((id) => {
        const input = document.getElementById(id);
        if (input) payload[id] = input.value;
      });
      appState.storage.setItem('hms_station_v1', payload);
    };

    ['input', 'change'].forEach((eventName) => {
      target.querySelectorAll('input, textarea, select').forEach((element) => element.addEventListener(eventName, persistDraft));
    });
  });
}
