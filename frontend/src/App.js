import React from 'react';

import './global.css';

import Routes from './routes';

/**
 * Estado / State -> armazena valores
 * <Header title="Semana OminiStack" /> // Recuperando informações via props
 * Outra opção: props.children pra recuperar o valor
 * Para refletir o valor de count após a alteração feita pela função, precisamos usar o conceito de estado, para isso, precisamos importar tb o useState
 * counter++ não podemos usar dessa forma, pois não podemos mudar o valor do estado de uma forma direta. Precisamos sobrepor
 * Conceito de estado: Toda vez que o nosso componente precisar armazenar alguma informação dentro dele, nós não criamos uma variável comum, mas sempre o estado, pois as alterações são refletidas na interface. 
 */


function App() {
  return (
    <div>
      <Routes />
    </div>
  );
}

export default App;
