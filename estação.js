const params = new URLSearchParams(window.location.search);
const initialMode = params.get('mode') || 'entrada';
const initialQp = params.get('qp');

MODE = initialMode;
if (initialQp && scenarios[initialQp]) {
  SC = initialQp;
}
