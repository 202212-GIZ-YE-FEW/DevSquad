import renderer from "react-test-renderer";
import HowitworkCard from "../Index";

it("renders correctly", () => {
    const tree = renderer.create(<HowitworkCard />).toJSON();
    expect(tree).toMatchSnapshot();
});
