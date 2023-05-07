import { render } from "@testing-library/react";
import React from "react";

import Eventinerestcomponent from "../index";

it("renders correctly", () => {
    const checkedState = []; // Initialize checkedState as an empty array
    render(<Eventinerestcomponent checkedState={checkedState} />);
});
