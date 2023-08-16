import { Box } from "@mui/material";
import '../styleCSS/error.css'

export default function Error() {
    return (
        <Box
            className="body"
        >
            <a href="/">
                <header className="top-header"></header>

                {/* Dust particle */}
                <div>
                    <div className="starsec"></div>
                    <div className="starthird"></div>
                    <div className="starfourth"></div>
                    <div className="starfifth"></div>
                </div>
                {/* Dust particle end */}

                <div className="lamp__wrap">
                    <div className="lamp">
                        <div className="cable"></div>
                        <div className="cover"></div>
                        <div className="in-cover">
                            <div className="bulb"></div>
                        </div>
                        <div className="light"></div>
                    </div>
                </div>
                <section className="error">
                    <div className="error__content">
                        <div className="error__message message">
                            <h2 className="message__title"><h1
                                style={{
                                    fontSize: '100px'
                                }}
                            >404</h1>Page Not Found</h2>
                            <p className="message__text">We're sorry, the page you were looking for isn't found here. The link you followed may either be broken or no longer exists. Please try again, or take a look at our.</p>
                        </div>
                        <div className="error__nav e-nav">
                            <a href="/" className="e-nav__link"></a>
                        </div>
                    </div>
                    {/* END Content */}
                </section>
            </a>
        </Box>
    );
}