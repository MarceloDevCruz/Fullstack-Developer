import React from "react";
import { Main } from "../../components/styles/Main.jsx";
import PATHS from "../../navigation/navigation.js";
import {
  Page,
  Center,
  Card,
  Title404,
  Lead,
  Text,
  Actions,
  Button
} from "./styled";

export default function NotFound() {
  return (
    <Main>
      <Page>
        <Center>
          <Card>
            <Title404>404</Title404>
            <Lead>Página não encontrada</Lead>
            <Text>A rota que você tentou acessar não existe ou foi removida.</Text>
            <Actions>
              <Button to={PATHS.admin}>Voltar para o início</Button>
            </Actions>
          </Card>
        </Center>
      </Page>
    </Main>
  );
}