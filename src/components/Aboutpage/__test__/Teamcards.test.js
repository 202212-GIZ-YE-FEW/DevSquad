import renderer from "react-test-renderer";

import Teamcards from "../Teamcards";

it("renders correctly", () => {
    const tree = renderer.create(<Teamcards />).toJSON();
    expect(tree).toMatchSnapshot();
});
