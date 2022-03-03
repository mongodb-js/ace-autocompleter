const chai = require('chai');
const sinonChai = require('sinon-chai');
const jsdom = require('jsdom');
const virtualConsole = new jsdom.VirtualConsole();

virtualConsole.sendTo(console, { omitJSDOMErrors: true });

require('jsdom-global')('', {
  virtualConsole: virtualConsole,
  beforeParse(win) {
    win.URL = {
      createObjectURL: () => {}
    };
  },
  runScripts: 'dangerously'
});

class Worker {
  postMessage() {
    return true;
  }
  terminate() {
    return true;
  }
}

global.Worker = Worker;

chai.should();
chai.use(sinonChai);
