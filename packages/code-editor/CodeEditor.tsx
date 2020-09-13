import * as React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import MenuIcon from "@material-ui/icons/Menu";
import Paper from "@material-ui/core/Paper";
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline";
import styled from "styled-components";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
import { mdx } from "@mdx-js/react";
import "./themes/prism-synthwave84.css";

import {
  AppBar,
  Card,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  Grid,
  CardContent,
} from "@material-ui/core";
import {
  StyledEditorPaper,
  StyledLiveErrorPaper,
  Container,
  StyledProvider,
  RenderWrapper,
  StyledPreview,
  StyledPreviewPaper,
} from "./Container";

const StyledCard = styled(Card)`
  padding: 0;
  .MuiCardContent-root {
    padding: 0;
    :last-child {
      padding: 0;
    }
  }
`;
export const CodeEditor: React.FC<{
  live?: boolean
  render?: boolean
  className?: string
  title?: string
}> = ({ children, live, render, className, title = "Example" }) => {
  return live ? (
    <ScopedCssBaseline>
      <Paper elevation={10} variant="outlined" square={true}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h5">{title}</Typography>
            <Button color="inherit">Reset</Button>
          </Toolbar>
        </AppBar>
        <Box>
          <LiveProvider
            code={String(children).trim()}
            transformCode={(code: string) => "/** @jsx mdx */" + code}
            scope={{ mdx }}
          >
            <StyledCard square={true}>
              <CardContent>
                <StyledEditorPaper square={true}>
                  <LiveEditor />
                </StyledEditorPaper>
                <StyledLiveErrorPaper square={true}>
                  <LiveError />
                </StyledLiveErrorPaper>

                <StyledPreviewPaper square={true}>
                  <Grid container={true} spacing={3} direction="row">
                    <Grid item xs>
                      <Paper>
                        <LivePreview id="live-copy" />
                      </Paper>
                    </Grid>
                  </Grid>
                </StyledPreviewPaper>
              </CardContent>
            </StyledCard>
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
  );
};
