import renderer from "react-test-renderer";

import Eventslist from "../index";

it("renders correctly", () => {
    const tree = renderer.create(<Eventslist />).toJSON();
    expect(tree).toMatchSnapshot();
});

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
