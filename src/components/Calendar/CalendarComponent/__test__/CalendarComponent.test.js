import renderer from "react-test-renderer";

import CalendarComponent from "../index";

it("renders correctly", () => {
    const tree = renderer.create(<CalendarComponent />).toJSON();
    expect(tree).toMatchSnapshot();
});
