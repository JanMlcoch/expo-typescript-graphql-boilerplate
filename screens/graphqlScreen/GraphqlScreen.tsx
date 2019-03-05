import React, {Component} from 'react';
import {ScrollView, Text} from 'react-native';
import {Query, QueryResult} from 'react-apollo';
import {styles} from './styles';
import getPokemonMaxHPGraphql from 'getPokemonMaxHP.graphql';

export default class GraphqlScreen extends Component {
  static navigationOptions = {
    title: 'Links',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.renderQuery()}
      </ScrollView>
    );
  }

  renderQuery = () => {
    console.log('renderig query');
    const variables = {
      name: 'pikachu',
    };
    return (
      <Query query={getPokemonMaxHPGraphql} variables={variables} fetchPolicy={'no-cache'}>
        {this.renderQueryResult}
      </Query>
    );
  };

  renderQueryResult = ({data, loading}: QueryResult) => {
    if (loading) {
      return <Text>Pikachu maxHP: loading</Text>;
    }
    if (data && data.pokemon) {
      return <Text>Pikachu maxHP: {data.pokemon.maxHP}</Text>;
    }
    return null;
  };
}
