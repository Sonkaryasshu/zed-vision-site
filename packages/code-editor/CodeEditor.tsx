import * as polished from "polished"
import * as React from "react"
import Card from "@material-ui/core/Card"
import Highlight, { defaultProps } from "prism-react-renderer"
import MenuIcon from "@material-ui/icons/Menu"
import Paper from "@material-ui/core/Paper"
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline"
import styled, { css } from "styled-components"
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live"
import { mdx } from "@mdx-js/react"
import "./themes/prism-synthwave84.css"

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  Grid,
  makeStyles,
  Theme,
  createStyles,
  CardContent,
} from "@material-ui/core"

// import html2canvas from "html2canvas"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    cardNoSpace: {
      padding: 0,
      paddingBottom: "0 !important",
    },
    paper: {
      padding: theme.spacing(2),
      minWidth: "200px",
    },
  })
)

// setTimeout(
//   () =>
//     html2canvas(document.getElementById("capture")!, {
//       background: {
//         type: null,
//       },
//       backgroundColor: null,
//       useCORS: true,
//       backgroundImage: null,
//       proxy: "https://cors-anywhere.herokuapp.com/",
//     }).then((canvas: Element) => {
//       console.log(canvas)
//       // document.body.appendChild(canvas)
//     }),
//   3000
// )

export const reactLiveHome = {
  plain: {
    color: "#e7d2ed",
  },
  styles: [
    {
      types: ["prolog", "comment", "doctype", "cdata"],
      style: {
        color: "hsl(30, 20%, 50%)",
      },
    },
    {
      types: ["property", "tag", "boolean", "number", "constant", "symbol"],
      style: { color: "#f677e1" },
    },
    {
      types: ["attr-name", "string", "char", "builtin", "insterted"],
      style: {
        color: "hsl(75, 70%, 70%)",
      },
    },
    {
      types: [
        "operator",
        "entity",
        "url",
        "string",
        "variable",
        "language-css",
      ],
      style: {
        color: "hsl(40, 90%, 70%)",
      },
    },
    {
      types: ["deleted"],
      style: {
        color: "rgb(255, 85, 85)",
      },
    },
    {
      types: ["italic"],
      style: {
        fontStyle: "italic",
      },
    },
    {
      types: ["important", "bold"],
      style: {
        fontWeight: "bold",
      },
    },
    {
      types: ["regex", "important"],
      style: {
        color: "#e90",
      },
    },
    {
      types: ["atrule", "attr-value", "keyword"],
      style: {
        color: "#f677e1",
      },
    },
    {
      types: ["punctuation", "symbol"],
      style: {
        opacity: "0.7",
      },
    },
  ],
}

// @ts-ignore
const Container = styled.div`
  margin: 0 auto;
  max-width: 100%;
  background: #12005e;
  width: ${polished.rem(1024)};
  padding: ${polished.rem(20)};
  padding-bottom: ${polished.rem(20)};
  text-align: center;
`
// @ts-ignore
const StyledProvider = styled(LiveProvider)`
  border-radius: ${polished.rem(3)};
  box-shadow: 1px 1px 20px rgba(20, 20, 20, 0.27);
  overflow: hidden;
  margin-bottom: ${polished.rem(100)};
`
// @ts-ignore
const LiveWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: stretch;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`
// @ts-ignore
const RenderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media (max-width: 300px) {
    flex-direction: column;
  }
`

const column = css`
  flex-basis: 50%;
  width: 50%;
  max-width: 50%;
  @media (max-width: 600px) {
    flex-basis: auto;
    width: 100%;
    max-width: 100%;
  }
`
// @ts-ignore
const StyledEditor = styled.div`
  font-family: "Source Code Pro", monospace;
  font-size: ${polished.rem(14)};
  height: ${polished.rem(350)};
  max-height: ${polished.rem(350)};
  overflow: auto;
  ${column};
  * > textarea:focus {
    outline: none;
  }
`
//@ts-ignore
const StyledPreview = styled(LivePreview)`
  position: relative;
  padding: 0.5rem;
  background: white;
  color: black;
  height: auto;
  overflow: hidden;
  ${column};
`
//@ts-ignore
const StyledError = styled(LiveError)`
  display: block;
  padding: ${polished.rem(8)};
  background-color: black;
  padding-bottom: 0;
  background: red;
  color: white;
  white-space: pre-wrap;
  text-align: left;
  font-size: 0.9em;
  font-family: "Source Code Pro", monospace;
`

const StyledEditorPaper = styled(Paper)`
  color: white;
  font-size: large;
  background-color: transparent !important;
  background-image: linear-gradient(to right bottom, #34294f 0%, #2a2139 30%);
`
const StyledLiveErrorPaper = styled(Paper)`
  color: white;
  font-size: large;
  background-color: transparent !important;
  background-image: linear-gradient(to right top, red 0%, #2a2139 30%);
`

const StyledPreviewPaper = styled(Paper)`
  color: black;
  padding: 10px;
  background-color: grey !important;
`

export const CodeEditor: React.FC<{
  live?: boolean
  render?: boolean
  className?: string
  title?: string
}> = ({ children, live, render, className, title = "Example" }) => {
  const classes = useStyles()

  return live ? (
    <ScopedCssBaseline>
      <Paper elevation={10} variant="outlined" square={true}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" className={classes.title}>
              {title}
            </Typography>
            <Button color="inherit">Reset</Button>
          </Toolbar>
        </AppBar>
        <Box>
          <LiveProvider
            code={String(children).trim()}
            transformCode={(code: string) => "/** @jsx mdx */" + code}
            scope={{ mdx }}
          >
            <Card>
              <CardContent className={classes.cardNoSpace}>
                <StyledEditorPaper>
                  <LiveEditor />
                </StyledEditorPaper>
                <StyledLiveErrorPaper>
                  <LiveError />
                </StyledLiveErrorPaper>

                {PreviewComponent(classes)}
              </CardContent>
            </Card>
          </LiveProvider>
        </Box>
      </Paper>
    </ScopedCssBaseline>
  ) : render ? (
    <Container>
      <StyledProvider code={String(children).trim()} scope={{ mdx }}>
        <RenderWrapper>
          <StyledPreview />
        </RenderWrapper>
      </StyledProvider>
    </Container>
  ) : (
    <Highlight
      {...defaultProps}
      code={String(children).trim()}
      language={className?.replace(/language-/, "") as any}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: "20px" }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}

// const EventReplayBox: React.FC<{ events: Event[] }> = ({ children }) => {
//   const [events, addEvents] = React.useState<Event[]>([])
//   const App = <div>{children}</div>

//   React.useEffect(){
//       document.getElementById("ddddddd")?.dispatchEvent(
//       })
//   }

//   return (
//      <div id="ddddddd">{children}</div>
//   )
// }

const EventCaptureBox: React.FC = ({ children }) => {
  const [events, addEvents] = React.useState<Event[]>([])

  return (
    <div
      onClick={e => {
        e.persist()
        addEvents([...events, e.nativeEvent])
      }}
    >
      {children}
    </div>
  )
}

function PreviewComponent(
  classes: Record<
    "title" | "root" | "menuButton" | "cardNoSpace" | "paper",
    string
  >
) {
  return (
    <StyledPreviewPaper>
      <Grid container={true} spacing={3} direction="row">
        <Grid item xs>
          <Paper className={classes.paper}>
            <EventCaptureBox>
              <LivePreview />
            </EventCaptureBox>
          </Paper>
        </Grid>

        <Grid item xs>
          <Paper className={classes.paper}>
            <LivePreview id="live-copy" style={{ overflow: "hidden" }} />
          </Paper>
        </Grid>
      </Grid>
    </StyledPreviewPaper>
  )
}
