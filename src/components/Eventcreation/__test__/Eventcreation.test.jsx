import renderer from "react-test-renderer";

import Eventcreation from "../index";
jest.mock("next/router", () => ({
    useRouter() {
        return {
            route: "/",
            pathname: "",
            query: "",
            asPath: "",
        };
    },
}));

it("renders correctly", () => {
    const tree = renderer.create(<Eventcreation />).toJSON();
    expect(tree).toMatchSnapshot();
});
