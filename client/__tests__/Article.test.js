import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { AuthProvider } from "../src/context/userContext";
import Article from "../src/components/Article";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

afterEach(cleanup);

it("CheckboxWithLabel changes the text after click", () => {
  render(
    <MemoryRouter>
      <AuthProvider isAuthenticated={true}>
        <Article
          article={{
            title: "Sample Article",
            description: "This is a sample article.",
            urlToImage: "sample-image-url.jpg",
          }}
        />
      </AuthProvider>
    </MemoryRouter>
  );
  expect(screen.getByText("Sample Article")).toBeInTheDocument();
  //const details = screen.getByTestId("details-button");

  //expect(details.textContent()).toBeInTheDocument();

  // fireEvent.click(getByLabelText(/off/i));

  //expect(queryByLabelText(/on/i)).toBeTruthy();
});

// test("renders articles when articles are available", async () => {
//   render(
//     <AuthProvider isAuthenticated={true}>
//       <Article
//         article={{
//           title: "Sample Article",
//           description: "This is a sample article.",
//           urlToImage: "sample-image-url.jpg",
//         }}
//       />
//     </AuthProvider>
//   );

//   expect(screen.getByText("Sample Article")).toBeInTheDocument();

//   expect(screen.getByText("This is a sample article.")).toBeInTheDocument();

//   setTimeout(() => {
//     expect(screen.getByTestId("details-button")).toBeInTheDocument();
//   }, 2000);
// });

// test("renders", async () => {
//   render(
//     <AuthProvider isAuthenticated={true}>
//       <Article
//         article={{
//           title: "Sample Article",
//           description: "This is a sample article.",
//           urlToImage: "sample-image-url.jpg",
//         }}
//       />
//     </AuthProvider>
//   );

//   expect(screen.getByTestId("details-button")).toBeInTheDocument();

//   //expect(screen.getByText("This is a sample article.")).toBeInTheDocument();
// });
