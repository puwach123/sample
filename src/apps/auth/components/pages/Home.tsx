import React from "react";

import {
  makeStyles,
  Typography,
  Link,
  AppBar,
  Toolbar,
  Box,
  InputBase,
  Menu,
  MenuItem,
  IconButton,
  Badge,
  ListItemIcon,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Button,
} from "@material-ui/core";
import { fade } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import StarIcon from "@material-ui/icons/Star";

import { Link as RouterLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { RootDispatch } from "../../redux/store";
import { logout } from "../../redux/actions/auth";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        Auth App
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  },
  section: {
    display: "flex",
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(0, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius * 1,
    backgroundColor: fade(theme.palette.grey[400], 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.grey[400], 0.25),
    },
    marginLeft: 0,
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const tiers = [
  {
    title: "Free",
    price: "0",
    description: [
      "10 users included",
      "2 GB of storage",
      "Help center access",
      "Email support",
    ],
    buttonText: "Sign up for free",
    buttonVariant: "text" as "text" | "outlined" | "contained" | undefined,
  },
  {
    title: "Pro",
    subheader: "Most popular",
    price: "15",
    description: [
      "20 users included",
      "10 GB of storage",
      "Help center access",
      "Priority email support",
    ],
    buttonText: "Get started",
    buttonVariant: "contained" as "text" | "outlined" | "contained" | undefined,
  },
  {
    title: "Enterprise",
    price: "30",
    description: [
      "50 users included",
      "30 GB of storage",
      "Help center access",
      "Phone & email support",
    ],
    buttonText: "Contact us",
    buttonVariant: "text" as "text" | "outlined" | "contained" | undefined,
  },
];
const footers = [
  {
    title: "Company",
    description: ["Team", "History", "Contact us", "Locations"],
  },
  {
    title: "Features",
    description: [
      "Cool stuff",
      "Random feature",
      "Team feature",
      "Developer stuff",
      "Another one",
    ],
  },
  {
    title: "Resources",
    description: [
      "Resource",
      "Resource name",
      "Another resource",
      "Final resource",
    ],
  },
  {
    title: "Legal",
    description: ["Privacy policy", "Terms of use"],
  },
];
const sections = [
  {
    text: "features",
  },
  {
    text: "enterprise",
  },
  {
    text: "support",
  },
];

function Home() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch<RootDispatch>();

  const handleLogout = async () => {
    await dispatch(logout(""));
    history.push("/login", { from: "/" });
  };

  const MenuIcons = ({ handleLogout }: { handleLogout: () => void }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    const menuId = "primary-search-account-menu";
    return (
      <Box>
        <IconButton aria-label="mails" color="default">
          <Badge>
            <MailIcon />
          </Badge>
        </IconButton>
        <IconButton aria-label="notifications" color="default">
          <Badge>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="default"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          id={menuId}
          keepMounted
          open={isMenuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "bottom", horizontal: "right" }}
          style={{ padding: 16 }}
        >
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon style={{ minWidth: 36 }}>
              <PersonIcon fontSize="default" />
            </ListItemIcon>
            <Typography variant="subtitle1">Profile</Typography>
          </MenuItem>
          <MenuItem
            component={RouterLink}
            to="/login"
            onClick={() => handleLogout()}
          >
            <ListItemIcon style={{ minWidth: 36 }}>
              <ExitToAppIcon fontSize="default" />
            </ListItemIcon>
            <Typography variant="subtitle1" color="primary">
              Logout
            </Typography>
          </MenuItem>
        </Menu>
      </Box>
    );
  };
  const Sections = () => {
    const classes = useStyles();
    return (
      <nav className={classes.section}>
        {sections.map((section) => (
          <Link
            key={section.text.toLowerCase()}
            variant="button"
            color="textPrimary"
            href="#"
            className={classes.link}
          >
            {section.text}
          </Link>
        ))}
      </nav>
    );
  };
  const SearchBar = () => {
    const classes = useStyles();
    return (
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
    );
  };

  return (
    <>
      {/* Header Begin */}
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appbar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography variant="h5" color="inherit" noWrap>
            Auth App
          </Typography>
          <Sections />
          <SearchBar />
          <MenuIcons handleLogout={handleLogout} />
        </Toolbar>
      </AppBar>
      {/* Header End */}
      {/* Hero Conent Begin */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Pricing
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >
          Quickly build an effective pricing table for your potential customers
          with this layout. It&apos;s built with default Material-UI components
          with little customization.
        </Typography>
      </Container>
      {/* Hero Content End */}
      {/* Price Begin */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.title} xs={12} sm={12} md={4}>
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{ align: "center" }}
                  action={tier.title === "Pro" ? <StarIcon /> : null}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      /mo
                    </Typography>
                  </div>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant={tier.buttonVariant}
                    color="primary"
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Price End */}
      {/* Footer Begin */}
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Grid container spacing={4} justify="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="textSecondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
        {/* Footer End */}
      </Container>
    </>
  );
}

export default Home;
