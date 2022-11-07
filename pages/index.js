import config from '../config.json';
import styled from 'styled-components';
import Menu from '../src/components/Menu';
import Image from 'next/image';
import bannerPic from '../src/static/img/banner_alura_tube.png';
import { CSSReset } from '../src/components/CSSReset';
import { StyledTimeline } from '../src/components/Timeline';

const HomePage = () => {
    return (
        <>
            <CSSReset />
            <div>
                <Menu />
                <Header />
                <Timeline playlists={config.playlists} />
                <Favorites favorites={config.favorites} />
            </div>
        </>
    );
};

const StyledHeader = styled.div`
    margin-top: 56px;
    z-index: -10;
    .banner {
        width: 100%;
    }
    .user-info {
        margin-top: 30px;
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
    .user-info > img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
`;

const Header = () => {
    // TODO: Corrigir a ocultação do menu quando rolamos a página.
    return (
        <StyledHeader>
            <Image className="banner" src={bannerPic} />
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>{config.name}</h2>
                    <p>{config.job}</p>
                </div>
            </section>
        </StyledHeader>
    );
};

const Timeline = (props) => {
    const playlistsNames = Object.keys(props.playlists);
    return (
        <StyledTimeline>
            {playlistsNames.map((playlistName) => {
                const videos = props.playlists[playlistName];

                return (
                    <section>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.map((video) => {
                                return (
                                    <a href={video.url} target="_blank">
                                        <img src={video.thumb} />
                                        <span>{video.title}</span>
                                    </a>
                                );
                            })}
                        </div>
                    </section>
                );
            })}
        </StyledTimeline>
    );
};

const StyledFavorites = styled.div`
    width: 100%;
    padding: 16px 32px;
    h2 {
        font-size: 16px;
        margin-bottom: 16px;
        text-transform: capitalize;
    }
    div {
        display: flex;
        flex-direction: row;
        align-items: left;
        width: 100%;
        gap: 16px;
    }
    a {
        display: flex;
        flex-direction: column;
        width: 100px;
        align-items: center;
    }
    img {
        border-radius: 50%;
        margin-bottom: 12px;
    }
    p {
        font-size: 14px;
        margin-bottom: 16px;
        text-transform: capitalize;
        text-align: center;
    }
`;

const Favorites = (props) => {
    const favorites = props.favorites;
    console.log(favorites);
    return (
        <StyledFavorites>
            <h2>Favorites</h2>
            <div>
                {favorites.map((favorite) => {
                    return (
                        <>
                            <a href={favorite.url} target="_blank">
                                <img src={favorite.avatar} />
                                <p>{favorite.user}</p>
                            </a>
                        </>
                    );
                })}
            </div>
        </StyledFavorites>
    );
};

export default HomePage;
