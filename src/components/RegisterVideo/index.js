import { createClient } from "@supabase/supabase-js";
import React from "react";
import { StyledRegisterVideo } from "./style";

function useForm(propsDoForm) {
  const [values, setValues] = React.useState(propsDoForm.initialValues);

  return {
    values,
    handleChange: (evento) => {
      const value = evento.target.value;
      const name = evento.target.name;
      setValues({
        ...values,
        [name]: value,
      });
    },
    clearForm(){
      setValues({});
    }
  };
}

const PROJECT_URL = "https://jprwjorsfjhuwmkbyqrp.supabase.co";
const PROJECT_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impwcndqb3JzZmpodXdta2J5cXJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg0MzMyNjIsImV4cCI6MTk4NDAwOTI2Mn0.RElSn3b0fLKBV9cL_Ntk858s3S-copo6zQsW9e0K1D4";
const supabase = createClient(PROJECT_URL, PROJECT_KEY)


export default function RegisterVideo() {
  const formCadastro = useForm({
    initialValues: { titulo: "", url: "", channel: "@" },
  });
  const [formVisivel, setFormVisivel] = React.useState(false);

  return (
    <>
    
      <StyledRegisterVideo>
        <button className="add-video" onClick={() => setFormVisivel(true)}>
          +
        </button>
        {formVisivel ? (
          <form
            onSubmit={(evento) => {
              evento.preventDefault();
                 // Contrato entre o nosso Front e o BackEnd
                 supabase.from("video").insert({
                  title: formCadastro.values.titulo,
                  url: formCadastro.values.url,
                  thumb: getThumbnail(formCadastro.values.url),
                  channel: formCadastro.values.channel,
                  playlist: "Adicionados Recentemente:",
               })
               .then((oqueveio) => {
                  console.log(oqueveio);
               })
               .catch((err) => {
                  console.log(err);
               })
              setFormVisivel(false);
              formCadastro.clearForm();
            }}
          >
            <div>
              <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>X</button>
              <input
                placeholder="Titulo do video"
                name="titulo"
                value={formCadastro.values.titulo}
                onChange={formCadastro.handleChange}
              />
              <input
                placeholder="URL"
                name="url"
                value={formCadastro.values.url}
                onChange={formCadastro.handleChange}
              />
              <input
                placeholder="Channel"
                name="channel"
                value={formCadastro.values.channel}
                onChange={formCadastro.handleChange}
              />
              <button type="submit">Cadastrar</button>
            </div>
          </form>
        ) : null}
      </StyledRegisterVideo>
    </>
  );
}


function getThumbnail(url){
  return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}