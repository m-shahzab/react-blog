import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Container, LogoutBtn, Logo } from "../../components";
import { Button } from "../../components/index";
import { uploadPost } from "../../reducer/slice/postSlice";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex items-center">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex ml-auto items-center">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <>
                <li>
                  <LogoutBtn />
                </li>
                <li>
                  <Button
                    className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                    bgColor="none"
                    textColor="blue-600"
                    onClick={() => navigate("/user")}
                  >
                    User
                  </Button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
