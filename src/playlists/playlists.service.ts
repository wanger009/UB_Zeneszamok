import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Playlist } from './entities/playlist.entity';
import { Song } from '../songs/entities/song.entity';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist)
    private playlistsRepository: Repository<Playlist>,
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
  ) {}

  create(createPlaylistDto: CreatePlaylistDto): Promise<Playlist> {
    const playlist = this.playlistsRepository.create(createPlaylistDto);
    return this.playlistsRepository.save(playlist);
  }

  findAll(): Promise<Playlist[]> {
    return this.playlistsRepository.find({ relations: ['songs'] });
  }

  findOne(id: number): Promise<Playlist> {
    return this.playlistsRepository.findOne({ where: { id }, relations: ['songs'] });
  }

  update(id: number, updatePlaylistDto: UpdatePlaylistDto): Promise<Playlist> {
    return this.playlistsRepository.save({ ...updatePlaylistDto, id });
  }

  async addSongToPlaylist(listid: number, songid: number): Promise<Playlist> {
    const playlist = await this.playlistsRepository.findOne({ where: { id: listid }, relations: ['songs'] });
    const song = await this.songsRepository.findOne({ where: { id: songid } });
    playlist.songs.push(song);
    return this.playlistsRepository.save(playlist);
  }

  async removeSongFromPlaylist(listid: number, songid: number): Promise<Playlist> {
    const playlist = await this.playlistsRepository.findOne({ where: { id: listid }, relations: ['songs'] });
    playlist.songs = playlist.songs.filter(song => song.id !== songid);
    return this.playlistsRepository.save(playlist);
  }

  remove(id: number): Promise<void> {
    return this.playlistsRepository.delete(id).then(() => {});
  }
}