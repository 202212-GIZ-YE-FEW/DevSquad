import renderer from "react-test-renderer";

import Eventinerestcomponent from "../index";

it("renders correctly", () => {
    const tree = renderer.create(<Eventinerestcomponent />).toJSON();
    expect(tree).toMatchSnapshot();
});
