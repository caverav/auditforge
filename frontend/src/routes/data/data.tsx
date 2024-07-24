import { useState } from "react";
import Card from "../../components/card/Card";
import SimpleInput from "../../components/input/SimpleInput";

export const Data = () => {
  const [valor, setValor] = useState("");

  /* const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValor(e.target.value);
  }; */

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
        <div>aslkdjsajlkd</div>
      </Card>
    </div>
  );
};
