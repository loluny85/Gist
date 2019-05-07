import React from 'react';
import Loader from '../Loader/Loading.Component';
import './SearchResult.Component.css';

const SearchResult = (props) => {
    return (
        <div className='search-result-container'>
        {props.gistList && props.gistList.length>0?
            (
                Array.isArray(props.gistList) && props.gistList.map((user, index)=> {
                    return (
                        <div key={user.id+index} className='search-card'>
                            <section className='search-card-section'>
                                <span>Gist Description</span>
                                <span>{user.description || 'Not Available'}</span>
                            </section>
                            <section className='search-card-section'>
                                <span>File Name</span>
                                <span>
                                {user.files.map((file, index)=>(
                                    <span key={index}>
                                        {file || 'No file types'}{' '}
                                    </span>
                                ))}
                                </span>
                            </section>
                            <section className='search-card-section'>
                            <span>
                                Forked users
                            </span>
                            {user.forkItems.length > 0?
                                ( <span className='forked-avatar'>
                                    {
                                        Array.isArray(user.forkItems) && user.forkItems.map((forkItem, index)=>{
                                            return (
                                                <span key={index}>
                                                    <img className='fork-avatar' src={forkItem.owner.avatar_url} alt='fork avatar'/>
                                                </span>
                                            )
                                        })
                                    }
                                </span> ) : (<span>No forks</span>)
                            }
                            </section>
                        </div>
                    );
                })
            )
                : ( props.loading && <Loader /> )
        }
        </div>
    )
}

export default SearchResult;