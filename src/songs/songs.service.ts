import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Song } from './entities/song.entity';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
  ) {}

  create(createSongDto: CreateSongDto): Promise<Song> {
    const song = this.songsRepository.create(createSongDto);
    return this.songsRepository.save(song);
  }

  findAll(): Promise<Song[]> {
    return this.songsRepository.find();
  }

  findOne(id: number): Promise<Song> {
    return this.songsRepository.findOne({ where: { id } });
  }

  update(id: number, updateSongDto: UpdateSongDto): Promise<Song> {
    return this.songsRepository.save({ ...updateSongDto, id });
  }

  remove(id: number): Promise<void> {
    return this.songsRepository.delete(id).then(() => {});
  }

  findFreeSongs(): Promise<Song[]> {
    return this.songsRepository.find({ where: { price: 0 } });
  }

  findTopSongs(count: number): Promise<Song[]> {
    return this.songsRepository.find({
      order: { rating: 'DESC' },
      take: count,
    });
  }

  async findPopularArtists(): Promise<any> {
    const songs = await this.songsRepository.find();
    const artistCount = songs.reduce((acc, song) => {
      acc[song.author] = (acc[song.author] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(artistCount).map(artist => ({
      artist,
      numberOfSongs: artistCount[artist],
    })).sort((a, b) => b.numberOfSongs - a.numberOfSongs);
  }
}