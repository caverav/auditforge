import { useState } from "react";
import Card from "../../components/card/Card";
import SimpleInput from "../../components/input/SimpleInput";
import SearchInput from "../../components/input/SearchInput";
import PrimaryButton from "../../components/button/PrimaryButton";

export const Data = () => {
  const [valor, setValor] = useState("");
  const onClickButton = () => {
    alert(valor);
  };
  const buttonFunction = () => {
    alert("hola");
  };
  return (
    <div className="w-2/3 mt-8 mx-auto">
      <Card title="Test input simple">
        <SimpleInput
          label="Nombre:"
          name="nombre"
          id="nombre"
          type="text"
          placeholder="Ingrese su nombre"
          value={valor}
          onChange={setValor}
        />
      </Card>
      <Card title={valor}>
        <div>eseselvalorr</div>
      </Card>
      <PrimaryButton onClick={onClickButton}>
        asdlkaskjldjlkdsajlk
      </PrimaryButton>
      <Card title="Test search input">
        <SearchInput
          label="Search:"
          name="search"
          id="search"
          type="text"
          placeholder="Busque algo"
          value={valor}
          onChange={setValor}
          buttonLabel="search"
          onClick={buttonFunction}
        />
      </Card>
    </div>
  );
};
