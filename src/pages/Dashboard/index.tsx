import { Container, Grid } from "@mui/material";
import { FormListItem } from "../../components";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import React from "react";

export const Dashboard = () => {
  const forms = useSelector((state: RootState) => state.main.data);

  const [selectedForm, setSelectedForm] = React.useState<number | null>();

  return (
    <div className="h-full">
      <Container sx={{ paddingBlock: 4 }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {forms?.map((item, index) => (
            <Grid item xs={4}>
              <FormListItem
                key={index}
                data={item}
                setSelectedForm={setSelectedForm}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};
