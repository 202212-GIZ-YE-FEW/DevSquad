import renderer from "react-test-renderer";
import HowitworkCard from "../index";

it("renders correctly", () => {
    const tree = renderer.create(<HowitworkCard />).toJSON();
    expect(tree).toMatchSnapshot();
});
