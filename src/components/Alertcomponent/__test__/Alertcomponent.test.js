import renderer from "react-test-renderer";

import Alertcomponent from "../index";

it("renders correctly", () => {
    const tree = renderer.create(<Alertcomponent />).toJSON();
    expect(tree).toMatchSnapshot();
});
