import { Box, Link } from "@mui/material";
import '../styleCSS/error.css'

export default function Error() {
    return (
        <Box className="body">
            <header className="top-header"></header>

                {/* Dust particle */}
                <Box>
                    <Box className="starsec"></Box>
                    <Box className="starthird"></Box>
                    <Box className="starfourth"></Box>
                    <Box className="starfifth"></Box>
                </Box>
                {/* Dust particle end */}

                <Box className="lamp__wrap">
                    <Box className="lamp">
                        <Box className="cable"></Box>
                        <Box className="cover"></Box>
                        <Box className="in-cover">
                            <Box className="bulb"></Box>
                        </Box>
                        <Box className="light"></Box>
                    </Box>
                </Box>
                <section className="error">
                    <Box className="error__content">
                        <Box className="error__message message">
                            <h2
                                style={{
                                    fontSize: '100px'
                                }}
                            >404</h2>
                            <h1 className="message__title">
                                Page Not Found</h1>
                            <p className="message__text">We're sorry, the page you were looking for isn't found here. The link you followed may either be broken or no longer exists. Please try again, or take a look at our.</p>
                        </Box>
                        <Box className="error__nav e-nav">
                            <a href="/" className="e-nav__link"></a>
                        </Box>
                    </Box>
                </section>
        </Box>
    );
}
