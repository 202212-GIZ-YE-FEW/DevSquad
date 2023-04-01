import renderer from "react-test-renderer";
import VolunteerCard from "../index";

it("renders correctly", () => {
    const tree = renderer.create(<VolunteerCard />).toJSON();
    expect(tree).toMatchSnapshot();
});
