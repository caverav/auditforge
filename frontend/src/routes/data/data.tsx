import { useState } from "react";
import Card from "../../components/card/Card";
import SimpleInput from "../../components/input/SimpleInput";
import PrimaryButton from "../../components/button/PrimaryButton";

export const Data = () => {
  const [valor, setValor] = useState("");
  const onClickButton = () => {
    alert(valor);
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
    </div>
  );
};
