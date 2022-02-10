import { Navigate, Route, Routes } from "react-router-dom";
import { CompanyResolverByParams } from "./resolvers/company";
import Form from "./form/form";
import Grid from "./grid/grid";
import HttpExceptionHandler from "../../common/handlers/HttpExceptionHandler";
import LinearGraph from "./graph/linear";
import { FeedbackException404 } from "../../common/feedback/feedbackExceptions";

export default function LayoutUI(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/company" />} />
      <Route path="company">
        <Route index element={<Grid />} />
        <Route path="form">
          <Route
            index
            element={
              <CompanyResolverByParams>
                <HttpExceptionHandler>
                  <Form />
                </HttpExceptionHandler>
              </CompanyResolverByParams>
            }
          />
          <Route
            path=":id"
            element={
              <CompanyResolverByParams>
                <HttpExceptionHandler>
                  <Form />
                </HttpExceptionHandler>
              </CompanyResolverByParams>
            }
          />
        </Route>
        <Route
          path="graph/:id"
          element={
            <CompanyResolverByParams>
              <HttpExceptionHandler>
                <LinearGraph />
              </HttpExceptionHandler>
            </CompanyResolverByParams>
          }
        />
      </Route>
      <Route path="*" element={<FeedbackException404 />} />
    </Routes>
  );
}
