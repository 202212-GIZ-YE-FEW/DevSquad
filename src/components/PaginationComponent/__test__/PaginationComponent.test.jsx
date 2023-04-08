import renderer from "react-test-renderer";

import PaginationComponent from "../index";

it("renders correctly", () => {
    const tree = renderer.create(<PaginationComponent />).toJSON();
    expect(tree).toMatchSnapshot();
});
