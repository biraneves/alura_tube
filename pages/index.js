import config from '../config.json';
import styled from 'styled-components';
import Menu from '../src/components/Menu';
import bannerPic from '../src/static/img/banner_alura_tube.png';
import { CSSReset } from '../src/components/CSSReset';
import { StyledTimeline } from '../src/components/Timeline';
import React from 'react';

function HomePage() {
    const [filterValue, setFilterValue] = React.useState('');

    return (
        <>
            <CSSReset />
            <div>
                <Menu
                    filterValue={filterValue}
                    setFilterValue={setFilterValue}
                />
                <Header />
                <Timeline
                    searchValue={filterValue}
                    playlists={config.playlists}
                />
                <Favorites favorites={config.favorites} />
            </div>
        </>
    );
}

const StyledHeader = styled.div`
    margin-top: 56px;
    z-index: -10;
    .banner {
        width: 100%;
    }
    .user-info {
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

const StyledBanner = styled.div`
    background-image: url(${({ bg }) => bg});
    height: 230px;
`;

function Header() {
    return (
        <StyledHeader>
            <StyledBanner bg={config.bg} />
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>{config.name}</h2>
                    <p>{config.job}</p>
                </div>
            </section>
        </StyledHeader>
    );
}

function Timeline({ searchValue, ...props }) {
    const playlistsNames = Object.keys(props.playlists);
    return (
        <StyledTimeline>
            {playlistsNames.map((playlistName) => {
                const videos = props.playlists[playlistName];

                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos
                                .filter((video) => {
                                    const titleNormalized =
                                        video.title.toLowerCase();
                                    const searchValueNormalized =
                                        searchValue.toLowerCase();

                                    return titleNormalized.includes(
                                        searchValueNormalized,
                                    );
                                })
                                .map((video) => {
                                    return (
                                        <a
                                            key={video.url}
                                            href={video.url}
                                            target="_blank"
                                        >
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
}

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
        overflow: hidden;
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

function Favorites(props) {
    const favorites = props.favorites;
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
}

export default HomePage;
